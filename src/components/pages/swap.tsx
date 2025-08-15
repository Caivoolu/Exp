import React, { useState } from 'react'
import { SwapWidget } from '@reservoir0x/relay-kit-ui'
import styles from './ui/swap.module.css'
import '@reservoir0x/relay-kit-ui/styles.css'

export default function SwapPage() {
  const [fromToken, setFromToken] = useState({
      chainId: 1,
          address: '0x0000000000000000000000000000000000000000',
              decimals: 18,
                  name: 'Ethereum',
                      symbol: 'ETH'
                        })
                          
                            const [toToken, setToToken] = useState({
                                chainId: 8453,
                                    address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
                                        decimals: 6,
                                            name: 'USDC',
                                                symbol: 'USDC'
                                                  })

                                                    return (
                                                        <div className={styles.swapContainer}>
                                                              <SwapWidget
                                                                      className={styles.swapWidget}
                                                                              supportedWalletVMs={['evm']}
                                                                                      fromToken={fromToken}
                                                                                              setFromToken={setFromToken}
                                                                                                      toToken={toToken}
                                                                                                              setToToken={setToToken}
                                                                                                                      defaultAmount="0.1"
                                                                                                                              onConnectWallet={() => {
                                                                                                                                        console.log('Connect wallet requested')
                                                                                                                                                }}
                                                                                                                                                        onSwapValidating={(quote, steps) => {
                                                                                                                                                                  console.log('Monitoring: Swap validating', quote, steps)
                                                                                                                                                                          }}
                                                                                                                                                                                  onSwapSuccess={(quote, steps) => {
                                                                                                                                                                                            console.log('Monitoring: Swap success', quote, steps)
                                                                                                                                                                                                    }}
                                                                                                                                                                                                            onSwapError={(error) => {
                                                                                                                                                                                                                      console.log('Monitoring: Swap error', error)
                                                                                                                                                                                                                              }}
                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                          )
                                                                                                                                                                                                                                          }