import React, { useState } from 'react';
import { Link } from 'gatsby';
import NavBar from '../../components/NavBar';
import Button from '../../components/Buttons';
import Footer from '../../components/Footer';
import PlayButton from '../../components/LandingPage/playbutton';
import TestimonialCard from 'src/components/TestimonialCard';
import FeatureGrid from 'src/components/FeatureGrid';

import hero from '../../images/hero.webp';
import cryptobots from '../../images/cryptobots.png';
import earnWhileYouLearn from 'src/assets/videos/earn while you learn-anim.mp4';
import createCurrency from 'src/assets/videos/anim-create-currency.mp4';
import FinanceIllustration from 'src/assets/wealth.webp';
import { MdClose } from 'react-icons/md';
import SadBot from 'src/images/SadBot.png';
import Theme from 'src/assets/theme.svg';

const MobileHome = () => {
  const [videoModal, setVideoModal] = useState(0);

  const [emailModal, setEmailModal] = useState(0);

  function VideoModal() {
    return (
      <div
        className={`bg-base-700 px-12 py-16 rounded-lg relative flex flex-col items-center shadow-lg text-center`}
        style={{ maxWidth: '90vw' }}
      >
        <div
          onClick={() => setVideoModal(0)}
          className="h-12 w-12 rounded-full bg-base-500 absolute right-4 top-4 cursor-pointer flex items-center justify-center text-white"
        >
          <MdClose size="24px" />
        </div>
        <div className="mt-4">
          <iframe
            width="300"
            height="185"
            src="https://www.youtube.com/embed/26XkW67TaCw?autoplay=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            autoPlay
          ></iframe>
        </div>
      </div>
    );
  }

  function EmailModal() {
    return (
      <div
        className={`bg-base-700 px-6 py-8 rounded-lg relative flex flex-col items-center shadow-lg text-center`}
        style={{ maxWidth: '90vw' }}
      >
        <div
          onClick={() => setEmailModal(0)}
          className="h-8 w-8 rounded-full bg-base-500 p-1 absolute right-8 top-6 cursor-pointer flex items-center justify-center text-white"
        >
          <MdClose size="16px" />
        </div>
        <img src={SadBot} className="h-32 w-32" />
        <div className="text-white">
          <h4 className={`text-lg font-extrabold mt-4`}>
            Device not Supported yet!
          </h4>
          <p className={`mt-2 text-sm font-normal `}>
            Requesting your email so we can send you details that you can use to
            access the platform on a desktop/laptop.{' '}
          </p>
          <div className="flex-col flex py-3 text-white ">
            <input
              type="email"
              className="text-sm px-6 py-2 rounded bg-base-600 outline-none border-2 border-base-500 h-12 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="Your Email Address"
              autoFocus
            />
          </div>
          <button
            className={`w-full bg-primary-600 hover:bg-primary-700 h-12 rounded font-bold text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Remind Me!
          </button>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="bg-base-900">
        {videoModal === 1 && (
          <div
            className="bg-base-700 bg-opacity-75 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setVideoModal(false)}
          >
            <VideoModal />
          </div>
        )}

        {emailModal === 1 && (
          <div
            className="bg-base-700 bg-opacity-75 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setEmailModal(false)}
          >
            <EmailModal />
          </div>
        )}
        <div className="py-8 flex justify-center items-center bg-base-900">
          <Link to="/tezos">
            <Theme className={`h-18 w-auto`} />
          </Link>
        </div>
        <section
          className="bg-base-900 justify-center items-center bg-no-repeat bg-top lg:bg-auto bg-contain"
          style={{ backgroundImage: `url(${hero})` }}
        >
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <button
              className="focus:outline-none"
              style={{ transition: 'all .15s ease' }}
              onClick={() => setVideoModal(1)}
            >
              {' '}
              <PlayButton />
            </button>
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="sm:text-7xl text-4xl mb-4 text-white font-black heading-glow">
                Learn to code on the blockchain, the fun way!
              </h1>
              <p className="mb-8 leading-relaxed text-base-50">
                Blockchain is all the hype these days, but learning blockchain
                can be tough! We've got you covered with our fun and free
                course, which will take you from a noob to blockchain pro in
                matter of a few hours and build your own Cryptobot and then an
                army of them to fight in the Cryptoverse Wars.
              </p>
              <div className="flex justify-center">
                <button
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => setEmailModal(1)}
                  className={`py-3 px-9 text-xl bg-primary-600 hover:bg-primary-700 text-white font-bold rounded focus:outline-none`}
                >
                  Start Building 🛠
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Why Blockchain starts here */}
        <section className="bg-base-800 py-20">
          <div className="grid md:grid-cols-5 grid-cols-1 gap-6 ">
            <div className="col-span-3 ">
              <div
                className={`flex flex-col md:pl-30 px-8 md:text-left text-center  items-start justify-center space-y-8 heading-glow`}
              >
                <h1 className="sm:text-7xl text-4xl mb-3 font-black text-white">
                  With blockchain, build better finance.
                </h1>
                <p className="text-base-50 text-lg">
                  A kid under 18 years can’t get a personal bank account, you
                  can’t transfer money from one continent to another without the
                  hassle of high bank fee, you can’t invest in companies without
                  putting in all your details. What if we told you, all that and
                  more is possible on the blockchain.
                  <br /> So much in finance is getting built on top of
                  blockchain in the DeFi sector and just in 2020 alone, Crypto’s
                  market has grown by a frickin’ 5x. <br />
                  Learn how to code on the blockchain, now’s the right time!
                </p>
              </div>
            </div>
            <div className="col-span-2 h-full w-full grid justify-items-center">
              <img
                src={FinanceIllustration}
                className="object-contain object-center max-h-104"
              />
            </div>
          </div>
        </section>
        {/* Why Blockchain ends here */}
        {/* Features start here */}
        <section className="bg-base-900 py-20">
          <div className="container mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-7xl text-4xl font-black font-mulish text-white heading-glow">
                What’s there for You?
              </h1>
            </div>
            <FeatureGrid
              heading="Create your own currency!"
              subtext="Learn how to create apps on the Tezos blockchain through our exciting
          course. You even learn how to make your own currency 🤑"
              video={createCurrency}
              videoType="mp4"
              to="/tezos/academy"
              padding="l"
              mobileOrder="last"
              order="first"
              buttonHidden="hidden"
            />
            <FeatureGrid
              heading="Earn while you learn!"
              subtext="Join the Cryptobot clan by winning your unique Cryptobot as NFT's and earn real money by trading with others in our marketplace! Major throwback to the  pokémon cards trading era ⚡️"
              video={earnWhileYouLearn}
              videoType="mp4"
              to="/tezos/marketplace"
              order="last"
              mobileOrder="last"
              padding="r"
              buttonHidden="hidden"
            />
          </div>
        </section>
        {/* Features end here */}

        {/* testimonials start here */}
        <section className="bg-base-800 py-20">
          <div className="container mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-7xl text-4xl font-black font-mulish text-white heading-glow px-6">
                Here’s what people say <span>about us</span>
              </h1>
            </div>
            <div className="grid md:grid-cols-3 gap-4 px-8 md:px-30">
              <TestimonialCard
                link="https://twitter.com/SydneyIfergan/status/1275990749327343616"
                img="https://pbs.twimg.com/profile_images/1352168053598015489/--A0kHHm_400x400.jpg"
                name="Sydney Ifergan (CryptoSYD)"
                username="SydneyIfergan"
                text={`"#Cryptoverse Wars is a very interesting method to help users learn how to code. Building the fighting functionalities of #CryptoBot.An interesting move.@tezos"`}
              />
              <TestimonialCard
                link="https://twitter.com/IgnoranceIt/status/1276223614581342208"
                img="https://pbs.twimg.com/profile_images/1330425486502227968/PZKStoLJ_400x400.jpg"
                name="Allen Walters"
                username="IgnoranceIt"
                text={`Used "Show answer" a lot, but I just completed Chapter 14 of Cryptoverse Wars - a metaverse created by @BUIDLabs to help in learning to build DApps on @Tezos using @SmartPy_io! Super fun building my Cryptobot Robot face to fight the Extraterrestrial alien!"`}
              />
              <TestimonialCard
                link="https://twitter.com/Pc8417/status/1277038984644845569"
                img="https://pbs.twimg.com/profile_images/795622680070422528/IrlFFpnV_400x400.jpg"
                name="Siva Ragavan"
                username="SivaRagavan_"
                text={`This looks pretty cool. Something to try over the weekend - "Cryptoverse Wars`}
              />
            </div>
          </div>
        </section>
        {/* testimonials end here */}
        {/* CTA start here */}
        <section className="bg-base-900 pt-20">
          <div class="container mx-auto flex flex-col justify-center items-center">
            <div className="flex flex-col text-center w-full mb-6">
              <h1 className="sm:text-7xl text-4xl font-black font-mulish text-white heading-glow">
                Ready to start your mission?
              </h1>
            </div>
            <div className="flex justify-center mb-8">
              <button
                style={{ transition: 'all .15s ease' }}
                onClick={() => setEmailModal(1)}
                className={`py-3 px-9 text-xl bg-primary-600 hover:bg-primary-700 text-white font-bold rounded focus:outline-none`}
              >
                Take me to my mission
              </button>
            </div>
            <img src={cryptobots} className="object-cover object-center " />
          </div>
        </section>
        {/* CTA ends here */}
        <div className="container mx-auto pt-3 pb-4 px-5 flex flex-col justify-center bg-base-900">
          <p className="text-white text-sm text-center">
            2020 | Made with ❤️ by people @
            <a href="https://buidllabs.io/" className="underline">
              BUIDL Labs
            </a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MobileHome;
