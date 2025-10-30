import React, { memo } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { ProjectCardProps } from '../types';

const ProjectCardComponent = memo(({ 
  project, 
  onBoost = async () => ({ status: 'success' } as const),
  className = ''
}: ProjectCardProps) => {
  const [amount, setAmount] = React.useState('1.0');
  const [showError, setShowError] = React.useState(false);

  const handleBoost = async () => {
    try {
      const result = await onBoost(amount);
      if (result.status === 'error') {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  const progress = React.useMemo(() => {
    return Math.min(
      (parseFloat(project.currentAmount) / parseFloat(project.goalAmount)) * 100,
      100
    );
  }, [project.currentAmount, project.goalAmount]);

  return (
    <div className={\`card p-4 \${className}\`}>
      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {progress.toFixed(1)}% of {project.goalAmount} ETH
          </p>
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
            min="0.1"
            step="0.1"
          />
          
          <Button 
            onClick={handleBoost}
            disabled={amount === '0'}
            className="flex items-center gap-2"
          >
            {amount === '0' ? (
              'Enter Amount'
            ) : (
              <>
                Support Project
                {onBoost.isLoading && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
              </>
            )}
          </Button>
        </div>

        {showError && (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to support project. Please try again.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
});

ProjectCardComponent.displayName = 'ProjectCard';

export default ProjectCardComponent;