import React from 'react';
import { Link } from 'gatsby';
import NavBar from '../../components/NavBar';
import Button from '../../components/Buttons';
import Footer from '../../components/Footer';
import PlayButton from '../../components/LandingPage/playbutton';

import learningInterface from '../../images/Interface.png';
import cryptobots from '../../images/cryptobots.png';
import earnWhileYouLearn from 'src/assets/videos/earn while you learn-anim.mp4';
import createCurrency from 'src/assets/videos/anim-create-currency.mp4';

const FeatureGrid = ({
  heading,
  subtext,
  buttontext,
  video,
  videoType,
  order,
  padding,
  to,
}) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-6 ">
      <div
        className={`flex flex-col md:p${padding}-30 px-8 py-12 md:items-start items-center md:text-left text-center  justify-center order-${order}`}
      >
        <h1 className="sm:text-5xl text-3xl mb-3 font-black text-white">
          {heading}
        </h1>
        <p className="text-base-50 text-base mb-6">{subtext}</p>

        <Link
          className={`py-3 px-9 text-xl border-primary-600 border-2 hover:border-primary-700 text-white font-bold rounded focus:outline-none`}
          to={to}
        >
          {buttontext}
        </Link>
      </div>
      <div className="h-full w-full">
        <video
          className="object-contain object-center"
          loop
          autoPlay
          muted
          preload="auto"
          height={`80%`}
          width={`80%`}
        >
          <source src={video} type={`video/${videoType}`} />
        </video>
      </div>
    </div>
  );
};

const TestimonialCard = ({ link, img, name, username, text }) => {
  return (
    <a
      className="h-full text-center bg-base-700 border-2 border-base-400 p-6 rounded-md transform transition ease-in-out duration-500 hover:scale-95"
      href={link}
      rel="noopener"
      target="_blank"
    >
      <img
        alt="testimonial"
        className="w-20 h-20 mb-3 object-cover object-center rounded-full inline-block"
        src={img}
      />
      <h4 className="text-white font-bold text-xl mb-1">{name}</h4>
      <p className="text-white text-base mb-2">@{username}</p>
      <p className="text-base-50 text-center">{text}</p>
    </a>
  );
};

function Landing() {
  return (
    <div>
      <NavBar />
      <section className="bg-base-900">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <a href="#" alt="video">
            <PlayButton />
          </a>
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="sm:text-7xl text-4xl mb-4 text-white font-black">
              Learn to code on the blockchain, the fun way!
            </h1>
            <p className="mb-8 leading-relaxed text-base-50">
              Blockchain is all the hype these days, but learning blockchain can
              be tough! We've got you covered with our fun and free course,
              which will take you from a noob to blockchain pro in matter of a
              few hours and build your own Cryptobot and then an army of them to
              fight in the Cryptoverse Wars.
            </p>
            <div className="flex justify-center">
              <Link
                to="/tezos/academy"
                className={`py-3 px-9 text-xl bg-primary-600 hover:bg-primary-700 text-white font-bold rounded focus:outline-none`}
              >
                Start Building 🛠
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Why Blockchain starts here */}
      <section className="bg-base-800 py-20">
        <div className="grid md:grid-cols-5 grid-cols-1 gap-6 ">
          <div className="col-span-3 ">
            <div
              className={`flex flex-col md:pl-30 px-8 md:text-left text-center  items-start justify-center space-y-8`}
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
                <br /> So much in finance is getting built on top of blockchain
                in the DeFi sector and just in 2020 alone, Crypto’s market has
                grown by a frickin’ 5x. <br />
                Learn how to code on the blockchain, now’s the right time!
              </p>
            </div>
          </div>
          <div className="col-span-2 bg-base-600 h-full w-full">
            <img src="" className="object-cover object-center" />
          </div>
        </div>
      </section>
      {/* Why Blockchain ends here */}
      {/* Features start here */}
      <section className="bg-base-900 py-20">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-7xl text-4xl font-black font-mulish text-white">
            What’s there for You?
          </h1>
        </div>
        <FeatureGrid
          heading="Create your own currency!"
          subtext="Learn how to create apps on the Tezos blockchain through our exciting
          course. You even learn how to make your own currency 🤑"
          buttontext="Become a Blockchain Pro "
          video={createCurrency}
          videoType="webm"
          to="/tezos/academy"
          padding="l"
        />
        <FeatureGrid
          heading="Earn while you learn!"
          subtext="Join the Cryptobot clan by winning your unique Cryptobot and earn real money by trading with others in our marketplace! Major throwback to the  pokémon cards trading era ⚡️"
          buttontext="Explore mind-blowing Cryptobots"
          video={earnWhileYouLearn}
          videoType="mp4"
          to="/tezos/marketplace"
          order="2"
          padding="r"
        />
      </section>
      {/* Features end here */}

      {/* testimonials start here */}
      <section className="bg-base-800 py-20">
        <div className="container px-30 mx-auto">
          <div className="flex flex-col justify-center w-full text-center  mb-20">
            <h1 className="sm:text-7xl text-4xl font-black font-mulish text-white">
              Here’s what people say <br /> about us
            </h1>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
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
      <section className="bg-base-900 py-20">
        <div class="container mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-col text-center w-full mb-6">
            <h1 className="sm:text-7xl text-4xl font-black font-mulish text-white">
              Ready to start your mission?
            </h1>
          </div>
          <div className="flex justify-center">
            <Link
              className={`py-3 px-9 text-xl bg-primary-600 hover:bg-primary-700 text-white font-bold rounded focus:outline-none`}
              to="/tezos/academy"
            >
              Take me to my mission
            </Link>
          </div>
          <img src={cryptobots} className="object-cover object-center " />
        </div>
      </section>
      {/* CTA ends here */}
      <Footer />
    </div>
  );
}

export default Landing;
