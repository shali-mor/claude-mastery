import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const NOTIFY_EMAIL = 'shali.mor@forcepoint.com';
const FROM_EMAIL = 'Claude Mastery <notifications@mail.claudemastery.com>';

interface ClerkEmailAddress {
  email_address: string;
  id: string;
}

interface ClerkExternalAccount {
  provider: string;
  email_address?: string;
}

interface ClerkUserCreatedData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email_addresses: ClerkEmailAddress[];
  primary_email_address_id: string;
  username: string | null;
  image_url: string;
  created_at: number;
  external_accounts: ClerkExternalAccount[];
}

interface ClerkWebhookEvent {
  type: string;
  data: ClerkUserCreatedData;
}

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Missing CLERK_WEBHOOK_SECRET' }, { status: 500 });
  }

  // Verify the webhook signature
  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(webhookSecret);

  let event: ClerkWebhookEvent;
  try {
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkWebhookEvent;
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  if (event.type !== 'user.created') {
    return NextResponse.json({ status: 'ignored' });
  }

  const user = event.data;

  const primaryEmail = user.email_addresses.find(
    (e) => e.id === user.primary_email_address_id
  )?.email_address ?? 'unknown';

  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ') || 'No name provided';
  const signedUpAt = new Date(user.created_at).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  });

  const authMethod =
    user.external_accounts.length > 0
      ? user.external_accounts.map((a) => a.provider).join(', ')
      : 'Email / Password';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 32px 16px; }
    .card { background: #ffffff; border-radius: 10px; max-width: 540px; margin: 0 auto; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #f97316; padding: 24px 32px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; }
    .header p { color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px; }
    .body { padding: 28px 32px; }
    .row { display: flex; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
    .row:last-child { border-bottom: none; }
    .label { color: #888; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 130px; flex-shrink: 0; padding-top: 1px; }
    .value { color: #1a1a1a; font-size: 14px; word-break: break-all; }
    .footer { padding: 16px 32px; background: #fafafa; border-top: 1px solid #f0f0f0; font-size: 12px; color: #aaa; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Sign-up — Claude Mastery</h1>
      <p>${signedUpAt}</p>
    </div>
    <div class="body">
      <div class="row">
        <span class="label">Name</span>
        <span class="value">${fullName}</span>
      </div>
      <div class="row">
        <span class="label">Email</span>
        <span class="value">${primaryEmail}</span>
      </div>
      ${user.username ? `
      <div class="row">
        <span class="label">Username</span>
        <span class="value">${user.username}</span>
      </div>` : ''}
      <div class="row">
        <span class="label">Auth Method</span>
        <span class="value">${authMethod}</span>
      </div>
      <div class="row">
        <span class="label">User ID</span>
        <span class="value" style="font-family: monospace; font-size: 12px;">${user.id}</span>
      </div>
    </div>
    <div class="footer">
      Sent automatically by Claude Mastery on every new sign-up.
    </div>
  </div>
</body>
</html>
  `.trim();

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    subject: `New sign-up: ${fullName} (${primaryEmail})`,
    html,
  });

  return NextResponse.json({ status: 'ok' });
}
