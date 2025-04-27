import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react' 
import Blockies from 'react-blockies'

import logo from '../assets/logo.png'
import eth from '../assets/eth.svg'

import { loadAccount } from '../store/interactions'

import config from '../config.json';

const Navbar = () => {
  const provider = useSelector(state => state.provider.connection)
  const rawChain = useSelector(state => state.provider.chainId)
  const chainId = typeof rawChain === 'string' ? parseInt(rawChain, 16) : rawChain
  const account = useSelector(state => state.provider.account)
  const balance = useSelector(state => state.provider.balance)

  const dispatch = useDispatch()

  useEffect(() => {
  if (!window.ethereum) return

  const handle = () => window.location.reload()   // simplest refresh

  window.ethereum.on('chainChanged', handle)
  return () => window.ethereum.removeListener('chainChanged', handle)
}, [])


  const connectHandler = async () => {
    await loadAccount(provider, dispatch)
  }

  const networkHandler = async (e) => {
  const hex = e.target.value   // "0x7a69", "0xaa36a7", etc.

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hex }]
    })
  } catch (err) {
    console.error('switch error →', err)

    // Chain not added yet
    const notAdded = err.code === 4902 ||
                     (err.code === -32603 && err?.data?.originalError?.code === 4902)

    if (notAdded && config[hex]) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [config[hex]]
        })
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: hex }]
        })
      } catch (addErr) {
        console.error('add error →', addErr)
      }
    } else if (err.code === -32002) {
      alert('Check MetaMask – there’s already a pending request.')
    }
  }
}

  return(
    <div className='exchange__header grid'>
      <div className='exchange__header--brand flex'>
        <img src={logo} className="logo" alt="DApp Logo"></img>
        <h1>DApp Token Exchange</h1>
      </div>

      <div className='exchange__header--networks flex'>
        <img src={eth} alt="ETH Logo" className='Eth Logo' />

          {chainId && (
  <select
    name="networks"
    id="networks"
    value={config[chainId] ? `0x${chainId.toString(16)}` : '0'}
    onChange={networkHandler}
  >
    <option value="0" disabled>Select Network</option>
    <option value="0x7a69">Localhost</option>   {/* 31337 */}
    <option value="0xaa36a7">Sepolia</option>   {/* 11155111 */}
    <option value="0x88bb0">Hoodi</option>      {/* 559760 */}
  </select>
)}

      </div>

      <div className='exchange__header--account flex'>
        {balance ? (
          <p><small>My Balance</small>{Number(balance).toFixed(4)}</p>
        ) : (
          <p><small>My Balance</small>0 ETH</p>
        )}
        {account ? (
          <a
            href={config[chainId] ? `${config[chainId].explorerURL}/address/${account}` : `#`}
            target='_blank'
            rel='noreferrer'
          >
            {account.slice(0,5) + '...' + account.slice(38,42)}
            <Blockies
              seed={account}
              size={10}
              scale={3}
              color="#2187D0"
              bgColor="#F1F2F9"
              spotColor="#767F92"
              className="identicon"
            />
          </a>
        ) : (
          <button className="button" onClick={connectHandler}>Connect</button>
        )}
      </div>
    </div>
  )
}

export default Navbar;
