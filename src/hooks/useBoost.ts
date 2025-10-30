import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import { Project } from '../types';

export const useBoost = (contractAddress: string, contractABI: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const boostProject = useCallback(async (
    projectId: number,
    amount: string,
    signer: ethers.Signer
  ): Promise<BoostResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const amountInWei = ethers.utils.parseEther(amount);
      
      const tx = await contract.boost(projectId, amountInWei);
      const receipt = await tx.wait();
      
      return {
        status: 'success',
        data: {
          transactionHash: receipt.transactionHash,
          amount
        }
      };
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return {
        status: 'error',
        error: error.message
      };
    } finally {
      setIsLoading(false);
    }
  }, [contractAddress, contractABI]);

  return { boostProject, isLoading, error };
};