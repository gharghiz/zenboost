import { useCallback } from 'react';
import { ethers } from 'ethers';

export const useBoost = () => {
  const boostContract = async (
    projectId: number,
    amount: string,
    signer: ethers.Signer
  ) => {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_ZENBOOST_ADDRESS!,
      ZENBOOST_ABI,
      signer
    );
    
    const amountInWei = ethers.utils.parseEther(amount);
    
    const tx = await contract.boost(projectId, amountInWei);
    return tx.wait();
  };

  const calculateProgress = useCallback((
    currentAmount: string,
    goalAmount: string
  ): number => {
    return Math.min(
      (parseFloat(currentAmount) / parseFloat(goalAmount)) * 100,
      100
    );
  }, []);

  return { boostContract, calculateProgress };
};