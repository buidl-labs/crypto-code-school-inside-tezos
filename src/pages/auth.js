import React, { useEffect, useState, useMemo, useContext, useRef } from 'react';
import { navigate, Link } from 'gatsby';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { useAtom } from 'jotai';
import userAtom from '../atoms/user-atom';
import isUserAtom from '../atoms/is-user-atom';
import { BeaconContext } from '../context/beacon-context';
import SEO from 'src/components/Seo';
import AuthLayout from '../components/AuthLayout';
import thanosLogo from '../images/thanos-wallet.png';
import SadBot from '../images/SadBot.png';
import {
  createUser,
  updateUser,
  verifyUser,
  batchUpdateProgress,
} from '../api';
import { NetworkType } from '@airgap/beacon-sdk';
import { Magic } from 'magic-sdk';
import { NETWORK } from 'src/defaults';

// To connect to Delphinet, change this to NetworkType.DELPHINET
const network =
  NETWORK === 'delphinet' ? NetworkType.DELPHINET : NetworkType.MAINNET;

function isBrowserSupported() {
  if (typeof window !== 'undefined') {
    const chrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    const firefox = typeof InstallTrigger !== 'undefined';
    return chrome || firefox;
  }
  return false;
}

function ErrorMessage({ children }) {
  return <span className={`text-sm text-error-400 mt-2`}>{children}</span>;
}

function InputContainer({ children }) {
  return (
    <div className={`flex justify-start flex-col text-left`}>{children}</div>
  );
}
function Button({ children, clickHandler, disabled = false }) {
  return (
    <button
      onClick={clickHandler}
      className={`w-full bg-primary-600 py-3 rounded font-bold text-2xl mt-16 disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function BaseModal({ children, img_src }) {
  return (
    <div
      className={`bg-base-700 px-12 py-16 rounded-lg relative flex flex-col items-center shadow-lg text-center`}
      style={{ maxWidth: '40vw' }}
    >
      {img_src && <img className={`m-0 w-auto`} src={img_src}></img>}
      {children}
    </div>
  );
}

function ModalHeading({ children }) {
  return <h4 className={`text-2xl font-extrabold`}>{children}</h4>;
}

function ModalTextSection({ children }) {
  return <div className={`mt-6`}>{children}</div>;
}

function ModalTextBody({ children }) {
  return <p className={`mt-6 text-lg`}>{children}</p>;
}

function BrowserSupportMissingModal() {
  return (
    <BaseModal img_src={SadBot}>
      <ModalTextSection>
        <ModalHeading>
          Your Browser doesn’t supports Thanos Wallet Extension
        </ModalHeading>
        <ModalTextBody>
          Currently, the Thanos Wallet extension is supported only on Firefox,
          Chrome and Brave Browser. Please visit from one of those browsers to
          proceed with acquiring cryptobot.
        </ModalTextBody>
      </ModalTextSection>
    </BaseModal>
  );
}

function ThanosNotAvailableModal() {
  return (
    <BaseModal img_src={thanosLogo}>
      <ModalTextSection>
        <ModalHeading>Install Thanos Wallet browser extension</ModalHeading>
        <ModalTextBody>
          Thanos Wallet will serve as a safe place to store your super cool
          Cryptobots. This will also act as your login to the platform (no extra
          password needed).
          <div className={`mt-4`}>
            Installed?{' '}
            <button
              className={`font-bold underline`}
              onClick={() => location.reload()}
            >
              Refresh this page to detect.
            </button>
          </div>
        </ModalTextBody>
      </ModalTextSection>
      <a
        href="https://thanoswallet.com/download"
        target="_blank"
        className={`w-full bg-primary-600 py-3 rounded font-bold text-2xl mt-16`}
      >
        Install Thanos
      </a>
      <p className={`mt-6 text-sm`}>
        Got stuck?{' '}
        <a href="#" className={`underline`}>
          Here’s a Guide to Install and Setup Thanos Wallet
        </a>
      </p>
    </BaseModal>
  );
}

function ConnectWalletModal({ clickHandler }) {
  return (
    <BaseModal img_src={thanosLogo}>
      <ModalTextSection>
        <ModalHeading>Connect Thanos Wallet</ModalHeading>
        <ModalTextBody>
          Thanos Wallet will serve as a safe place to store your super cool
          Cryptobots. This will also act as your login to the platform (no extra
          password needed).
        </ModalTextBody>
        <Button clickHandler={clickHandler} disabled={false}>
          Connect Wallet
        </Button>
      </ModalTextSection>
    </BaseModal>
  );
}

function VerifyEmailModal(props) {
  let { email, setEmail, nickname, setNickname } = props;
  const { user, setUser } = props;
  const [error, setError] = useState('');
  const magic = useRef(new Magic('pk_test_90E65EC554AC32F6'));

  async function verifyEmail(e) {
    e.preventDefault();

    let res = await updateUser(email, nickname, user);
    console.log(res);
    if (Object.keys(await res).includes('error')) setError(res.error);
    else {
      setUser(res);
      let didToken = await magic.current.auth.loginWithMagicLink({
        email: res.email,
      });
      let u = await verifyUser(didToken);
      console.log(u);
      setUser(u);
    }
  }
  /*
  TODO: 1. Disable button if email and nickname are not filled.
        2. Red borders on both the inputs on error.
  */

  return (
    <BaseModal>
      <ModalHeading>Just one last thing</ModalHeading>
      <ModalTextBody>
        Your email address will only be used to send you important updates. Your
        Nickname is how other cryptoverse wars members will identify you.
      </ModalTextBody>
      <form className={`mt-8 space-y-4 flex flex-col justify-center w-full`}>
        <InputContainer>
          <input
            className={`px-6 py-2.5 w-full text-lg bg-base-600 rounded border ${
              error === 'EMAIL_ALREADY_USED'
                ? 'border-error-400'
                : 'border-base-500'
            }`}
            placeholder={'Your email address'}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          {error === 'EMAIL_ALREADY_USED' && (
            <ErrorMessage>
              Please pick another email, this one's used with another account.
            </ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <input
            className={`px-6 py-2.5 w-full text-lg bg-base-600 rounded border ${
              error === 'NAME_ALREADY_USED'
                ? 'border-error-400'
                : 'border-base-500'
            }`}
            placeholder={`Nickname`}
            value={nickname}
            onChange={e => {
              setNickname(e.target.value);
              setError('');
            }}
          />
          {error === 'NAME_ALREADY_USED' && (
            <ErrorMessage>
              Please pick another name, this one's used with another account.
            </ErrorMessage>
          )}
        </InputContainer>
        <Button clickHandler={verifyEmail} disabled={error !== ''}>
          Verify your email
        </Button>
      </form>
    </BaseModal>
  );
}

function MagicLinkModal({ user, setUser }) {
  const magic = useRef(new Magic('pk_test_90E65EC554AC32F6'));

  async function magiclinkVerify(e) {
    let didToken = await magic.current.auth.loginWithMagicLink({
      email: user.email,
    });
    let u = await verifyUser(didToken);
    setUser(u);
  }
  return (
    <BaseModal>
      <ModalTextSection>
        <ModalHeading>Hi {user.name}</ModalHeading>
        <ModalTextBody>
          To continue you need to verify your email {user.email}.
        </ModalTextBody>
      </ModalTextSection>
      <Button disabled={false} clickHandler={magiclinkVerify}>
        Verify
      </Button>
    </BaseModal>
  );
}

function LoggedInModal() {
  return (
    <BaseModal>
      <ModalTextSection>
        <ModalHeading>You're good to go!</ModalHeading>
      </ModalTextSection>
      <Link
        to="/tezos"
        className={`w-full bg-primary-600 py-3 rounded font-bold text-2xl mt-16`}
      >
        Continue
      </Link>
    </BaseModal>
  );
}

const AuthPage = ({ location }) => {
  let beacon = useContext(BeaconContext);
  const browserSupport = useMemo(isBrowserSupported);
  const [thanosAvailable, setThanosAvailable] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [isUser, _] = useAtom(isUserAtom);
  const isUserVerified = useMemo(() => user.verified);

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    typeof window !== 'undefined' &&
      ThanosWallet.onAvailabilityChange(available =>
        setThanosAvailable(available),
      );
  }, []);

  useEffect(() => {
    if (isUserVerified) {
      let progress =
        typeof window !== `undefined` && localStorage.getItem('progress');
      if (progress) {
        progress = JSON.parse(progress);
        batchUpdateProgress(user, progress).then(res =>
          console.log('bath update', res),
        );
      }
      navigate(location.state ? location.state.pathname : '/tezos');
    }
  }, [isUserVerified]);

  async function connectWallet() {
    const acc = await beacon.client.getActiveAccount({
      network: {
        type: network,
      },
    });
    console.log(acc);
    let u;
    if (acc) {
      u = await createUser(acc.address);
      console.log('u', u);
    } else {
      try {
        const resp = await beacon.client.requestPermissions({
          network: {
            type: network,
          },
        });
        if (!resp.address) throw new Error();
        u = await createUser(resp.address);
        console.log('u', u);
      } catch (err) {
        console.log(err);
        return;
      }
    }

    setUser(u);
  }

  return (
    <>
      <AuthLayout>
        <SEO
          title="Cryptobots vs Aliens | Crypto Code School | Learn to program smart contracts in SmartPy"
          keywords={[
            `smartpy`,
            `python`,
            `interactive`,
            `programming`,
            `tutorial`,
            `tezos`,
            `blockchain`,
          ]}
        />
        <main
          className={`bg-base-900 min-h-screen text-white flex items-center justify-center`}
        >
          {!browserSupport ? (
            <BrowserSupportMissingModal />
          ) : !thanosAvailable ? (
            <ThanosNotAvailableModal />
          ) : !isUser ? (
            <ConnectWalletModal clickHandler={connectWallet} />
          ) : (
            <VerifyEmailModal
              email={email}
              setEmail={setEmail}
              nickname={nickname}
              setNickname={setNickname}
              user={user}
              setUser={setUser}
            />
          )}
        </main>
      </AuthLayout>
    </>
  );
};

export default AuthPage;
