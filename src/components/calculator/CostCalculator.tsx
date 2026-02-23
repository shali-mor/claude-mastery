'use client';

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Lightbulb, Zap, TrendingDown } from 'lucide-react';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { claudeModels, calculateCost } from '@/data/models';
import { getTipsForContext } from '@/data/optimizationTips';
import { formatCost, formatTokens } from '@/lib/utils';

function formatDollars(n: number) {
  if (n < 0.000001) return '$0.000000';
  if (n < 0.01) return `$${n.toFixed(6)}`;
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
}

const CHART_COLORS = [
  '#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'
];

export function CostCalculator() {
  const [inputTokens, setInputTokens] = useState(10000);
  const [outputTokens, setOutputTokens] = useState(2000);
  const [cachedTokens, setCachedTokens] = useState(0);
  const [useBatch, setUseBatch] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('claude-sonnet-4-6');

  const selectedModel = claudeModels.find(m => m.id === selectedModelId)!;

  const breakdown = useMemo(() => {
    return calculateCost(selectedModel, inputTokens, outputTokens, cachedTokens, useBatch);
  }, [selectedModel, inputTokens, outputTokens, cachedTokens, useBatch]);

  // Comparison data for chart
  const chartData = useMemo(() => {
    return claudeModels.map((model, i) => {
      const cost = calculateCost(model, inputTokens, outputTokens, cachedTokens, useBatch);
      return {
        name: model.displayName.replace('Claude ', '').replace(' 4.', '\n4.').replace(' 3.', '\n3.'),
        total: cost.total,
        colorIdx: i,
      };
    });
  }, [inputTokens, outputTokens, cachedTokens, useBatch]);

  const tips = useMemo(
    () => getTipsForContext(inputTokens, outputTokens, cachedTokens, useBatch),
    [inputTokens, outputTokens, cachedTokens, useBatch]
  );

  // Cost at 1M requests
  const costAtScale = breakdown.total * 1000;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Cost Calculator</h1>
        <p className="text-muted-foreground text-sm">
          Estimate API costs with real 2026 pricing. Compare models, Batch API, and prompt caching.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-5">
          {/* Model selector */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Model</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {claudeModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModelId(model.id)}
                  className={`w-full flex items-start gap-2 p-3 rounded-lg border text-left transition-all ${
                    selectedModelId === model.id
                      ? 'border-primary bg-primary/8'
                      : 'border-border hover:border-border/60 hover:bg-muted/30'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{model.displayName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      ${model.pricing.inputPerMillion}/M in · ${model.pricing.outputPerMillion}/M out
                    </div>
                  </div>
                  {selectedModelId === model.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                  )}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Options */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Options</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="batch" className="text-sm cursor-pointer">Batch API</Label>
                  <UITooltip>
                    <TooltipTrigger>
                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-48">50% off — async processing, results within 24h.</p>
                    </TooltipContent>
                  </UITooltip>
                </div>
                <div className="flex items-center gap-2">
                  {useBatch && <Badge variant="secondary" className="text-xs text-green-600 bg-green-500/10">-50%</Badge>}
                  <Switch
                    id="batch"
                    checked={useBatch}
                    onCheckedChange={setUseBatch}
                    disabled={!selectedModel.supportsBatchApi}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sliders + Results */}
        <div className="lg:col-span-2 space-y-5">
          {/* Token inputs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Token Parameters</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
              {/* Input tokens */}
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span>Input tokens</span>
                  <span className="font-mono font-medium">{formatTokens(inputTokens)}</span>
                </div>
                <Slider
                  value={[inputTokens]}
                  onValueChange={([v]) => setInputTokens(v)}
                  min={100}
                  max={200000}
                  step={100}
                  className="mb-1"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>100</span><span>200K</span>
                </div>
              </div>

              {/* Output tokens */}
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span>Output tokens</span>
                  <span className="font-mono font-medium">{formatTokens(outputTokens)}</span>
                </div>
                <Slider
                  value={[outputTokens]}
                  onValueChange={([v]) => setOutputTokens(v)}
                  min={0}
                  max={8192}
                  step={64}
                  className="mb-1"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span><span>8K</span>
                </div>
              </div>

              {/* Cached input tokens */}
              {selectedModel.supportsPromptCaching && (
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="flex items-center gap-1.5">
                      Cached input tokens
                      <Badge variant="secondary" className="text-xs text-green-600 bg-green-500/10">-90%</Badge>
                    </span>
                    <span className="font-mono font-medium">{formatTokens(cachedTokens)}</span>
                  </div>
                  <Slider
                    value={[cachedTokens]}
                    onValueChange={([v]) => setCachedTokens(Math.min(v, inputTokens))}
                    min={0}
                    max={inputTokens}
                    step={100}
                    className="mb-1"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span><span>{formatTokens(inputTokens)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cost breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Cost Breakdown — {selectedModel.displayName}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Regular input ({formatTokens(inputTokens - cachedTokens)} tokens)</span>
                  <AnimatedNumber value={breakdown.inputCost} formatter={formatDollars} className="font-mono font-medium" />
                </div>
                {cachedTokens > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      Cached input ({formatTokens(cachedTokens)} tokens)
                      <Zap className="h-3 w-3 text-green-500" />
                    </span>
                    <AnimatedNumber value={breakdown.cachedInputCost} formatter={formatDollars} className="font-mono font-medium text-green-600" />
                  </div>
                )}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Output ({formatTokens(outputTokens)} tokens)</span>
                  <AnimatedNumber value={breakdown.outputCost} formatter={formatDollars} className="font-mono font-medium" />
                </div>
                {useBatch && (
                  <div className="flex justify-between items-center text-sm text-green-600">
                    <span className="flex items-center gap-1.5"><TrendingDown className="h-3.5 w-3.5" />Batch API discount (50%)</span>
                    <span className="font-mono font-medium">applied above</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="font-semibold">Total per request</span>
                  <AnimatedNumber
                    value={breakdown.total}
                    formatter={formatDollars}
                    className="font-mono font-bold text-lg text-primary"
                  />
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>At 1,000 requests / day</span>
                  <AnimatedNumber value={costAtScale} formatter={formatDollars} className="font-mono" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model comparison chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Model Comparison</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 20, left: 4 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={v => formatDollars(v)}
                  />
                  <Tooltip
                    formatter={(val) => [formatDollars(Number(val ?? 0)), 'Cost']}
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.name.includes(selectedModel.displayName.split(' ').slice(-1)[0])
                          ? 'hsl(var(--primary))'
                          : CHART_COLORS[index % CHART_COLORS.length] + '80'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Optimization tips */}
      {tips.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            Optimization Suggestions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tips.map(tip => (
              <Card key={tip.id} className="border-primary/20">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">{tip.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                      <Badge variant="secondary" className="mt-2 text-xs text-green-600 bg-green-500/10">
                        {tip.savingsEstimate}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
