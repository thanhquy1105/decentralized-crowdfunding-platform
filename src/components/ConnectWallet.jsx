export default function ConnectWallet(props) {
    return (
        <div className='connectWallet'>
                <button className='walletButton' onClick={props.connectMetamask}>
                    Connect to Metamask
                </button>
        </div>
    );
}