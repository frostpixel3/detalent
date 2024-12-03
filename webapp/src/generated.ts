import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SomeExample
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const someExampleAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SomeExampleFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const someExampleFactoryAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newContractAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ContractDeployed',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deployContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deployedContracts',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDeployedContracts',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link someExampleAbi}__
 */
export const useReadSomeExample = /*#__PURE__*/ createUseReadContract({
  abi: someExampleAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link someExampleAbi}__ and `functionName` set to `"owner"`
 */
export const useReadSomeExampleOwner = /*#__PURE__*/ createUseReadContract({
  abi: someExampleAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link someExampleFactoryAbi}__
 */
export const useReadSomeExampleFactory = /*#__PURE__*/ createUseReadContract({
  abi: someExampleFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link someExampleFactoryAbi}__ and `functionName` set to `"deployedContracts"`
 */
export const useReadSomeExampleFactoryDeployedContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: someExampleFactoryAbi,
    functionName: 'deployedContracts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link someExampleFactoryAbi}__ and `functionName` set to `"getDeployedContracts"`
 */
export const useReadSomeExampleFactoryGetDeployedContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: someExampleFactoryAbi,
    functionName: 'getDeployedContracts',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link someExampleFactoryAbi}__
 */
export const useWriteSomeExampleFactory = /*#__PURE__*/ createUseWriteContract({
  abi: someExampleFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link someExampleFactoryAbi}__ and `functionName` set to `"deployContract"`
 */
export const useWriteSomeExampleFactoryDeployContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: someExampleFactoryAbi,
    functionName: 'deployContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link someExampleFactoryAbi}__
 */
export const useSimulateSomeExampleFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: someExampleFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link someExampleFactoryAbi}__ and `functionName` set to `"deployContract"`
 */
export const useSimulateSomeExampleFactoryDeployContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: someExampleFactoryAbi,
    functionName: 'deployContract',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link someExampleFactoryAbi}__
 */
export const useWatchSomeExampleFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: someExampleFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link someExampleFactoryAbi}__ and `eventName` set to `"ContractDeployed"`
 */
export const useWatchSomeExampleFactoryContractDeployedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: someExampleFactoryAbi,
    eventName: 'ContractDeployed',
  })
