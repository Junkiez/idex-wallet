import iota from './assets/icon.svg'
import { useEffect, useState } from 'react'
import BinaryRain from '@/components/binary-rain'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function WalletPage() {
  return (
    <div className="relative h-screen py-6 w-full flex flex-col justify-between items-center bg-black overflow-hidden">
      {/* Floating circles background */}
      <BinaryRain/>

      <div />
      <Active />
      <div />
    </div>
  )
}

const loadingHeaders = [
  { min: 0, max: 3, message: 'Initializing Exchange Environment' },
  { min: 3, max: 12, message: 'Connecting to Supported Blockchains' },
  { min: 12, max: 26, message: 'Loading Smart Contract Modules' },
  { min: 26, max: 34, message: 'Validating Contract Integrity' },
  { min: 34, max: 57, message: 'Fetching Live Token Metadata' },
  { min: 57, max: 78, message: 'Preparing Liquidity Infrastructure' },
  { min: 78, max: 93, message: 'Synchronizing Order Books and Swaps' },
  { min: 93, max: 98, message: 'Validating Liquidity and Pool States' },
  { min: 98, max: 100, message: 'Wallet Successfully Synchronized' }
]

const loadingMessages = [
  // Network Initialization (0–5%)
  { min: 0, max: 2, message: 'Initializing local Tangle environment' },
  { min: 2, max: 4, message: 'Loading protocol and node configuration' },
  { min: 4, max: 5, message: 'Preparing local cache and storage' },

  // Node Connection (5–12%)
  { min: 5, max: 8, message: 'Connecting to IOTA mainnet nodes' },
  { min: 8, max: 10, message: 'Establishing secure network sessions' },
  { min: 10, max: 12, message: 'Synchronizing node status and protocol version' },

  // Milestone Sync (12–25%)
  { min: 12, max: 17, message: 'Requesting latest milestones from the network' },
  { min: 17, max: 22, message: 'Verifying milestone signatures and references' },
  { min: 22, max: 25, message: 'Aligning local ledger with confirmed milestones' },

  // Block Downloading (25–50%)
  { min: 25, max: 35, message: 'Downloading recent blocks from the Tangle' },
  { min: 35, max: 45, message: 'Applying solidification to unconfirmed blocks' },
  { min: 45, max: 50, message: 'Tracking milestone progress and chain depth' },

  // Block Validation (50–70%)
  { min: 50, max: 58, message: 'Verifying parent block references and signatures' },
  { min: 58, max: 65, message: 'Checking transaction payloads and UTXO integrity' },
  { min: 65, max: 70, message: 'Applying consensus rules and confirming valid blocks' },

  // Ledger Consolidation (70–88%)
  { min: 70, max: 78, message: 'Updating local UTXO ledger with confirmed outputs' },
  { min: 78, max: 84, message: 'Applying balance changes and account states' },
  { min: 84, max: 88, message: 'Writing final ledger snapshot to local storage' },

  // Tangle Verification (88–96%)
  { min: 88, max: 91, message: 'Checking structural integrity of the Tangle graph' },
  { min: 91, max: 94, message: 'Verifying milestone consistency across nodes' },
  { min: 94, max: 96, message: 'Ensuring finality of confirmed transactions' },

  // Finalizing Synchronization (96–100%)
  { min: 96, max: 98, message: 'Completing ledger snapshot update' },
  { min: 98, max: 99, message: 'Cleaning temporary cache and session data' },
  { min: 99, max: 100, message: 'Tangle synchronized and ready ✅' }
]


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Active() {
  const [progress, setProgress] = useState(0)
  const [currentHeader, setCurrentHeader] = useState(loadingHeaders[0].message)
  const [, setCurrentMessage] = useState(loadingMessages[0].message)

  useEffect(() => {
    const totalIterations = 100
    let i = 0
    const increment = 100 / totalIterations

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const runStep = () => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment, 100)

        const message = loadingMessages.find(
          (msg) => newProgress >= msg.min && newProgress < msg.max
        )
        const header = loadingHeaders.find((msg) => newProgress >= msg.min && newProgress < msg.max)

        if (message && header) {
          setCurrentMessage(message.message)
          setCurrentHeader(header.message)
        }

        return newProgress
      })

      i++

      if (i < totalIterations) {
        const nextDelay = i < 30 ? i ** 2 * 500 : i ** 2 * 1300
        setTimeout(runStep, nextDelay)
      }
    }

    runStep()

    return () => {
      // cleanup — скасування всіх запланованих timeout-ів
      let id = window.setTimeout(() => {}, 0)
      while (id--) clearTimeout(id)
    }
  }, [])

  return (
    <div className="relative flex flex-col gap-8 items-center justify-center z-10">
      <div className="relative flex justify-center items-center w-36 h-36">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-radial from-pink-700/70 to-transparent blur-2xl"></div>
          <img
            src={iota}
            alt="iota"
            className="relative rounded-full w-36"
          />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white">IDEX Wallet</h1>
      <p className="text-sm text-gray-400">{currentHeader}</p>
      <div className="flex justify-start rounded-full h-1 w-96 bg-white/10">
        <div
          style={{ width: `${progress}%` }}
          className="flex justify-start rounded-full h-1 bg-gradient-to-r from-pink-700 to-violet-500 shadow-lg"
        />
      </div>
      <div className="text-center text-gray-400 space-y-4">
        <p className="text-pink-700 font-semibold text-lg">{progress}%</p>
        <p>This process might take a while</p>
      </div>
    </div>
  )
}
