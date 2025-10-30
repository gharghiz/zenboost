import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useBoost } from '../hooks/useBoost';

interface ProjectCardProps {
  projectId: number;
  projectName: string;
  goalAmount: string;
  currentAmount: string;
}

function ProjectCard({ projectId, projectName, goalAmount, currentAmount }: ProjectCardProps) {
  const { account } = useAccount();
  const { boostContract, calculateProgress } = useBoost();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleBoost = async (amount: string) => {
    if (!account) return;
    
    try {
      setIsProcessing(true);
      await boostContract(projectId, amount, account);
    } catch (error) {
      console.error('Error boosting project:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4 p-4 border rounded-lg">
      <h3 className="text-xl font-bold mb-2">{projectName}</h3>
      <div className="h-2 mb-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${calculateProgress(currentAmount, goalAmount)}%` }}
        />
      </div>
      <button 
        onClick={() => handleBoost("1.0")}
        disabled={isProcessing}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : 'Support Project'}
      </button>
    </div>
  );
}

export default ProjectCard;