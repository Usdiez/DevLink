'use client'; // This is a client component 👈🏽

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VerifyStep } from './VerifyStep';
import { createProfile, getUser } from '@/hooks/users';
import HomeBar from '@components/common/HomeBar';
import ProgressBar from '@components/common/ProgressBar';
import InfoStep from './InfoStep';
import SkillsStep from './SkillsStep';
import ConnectServices from './ConnectServices';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import Loading from '@components/common/Loading';
import { FBUserProvider } from '@context/FBUserContext';

export interface StepProps {
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
}

export default function CreateProfilePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [fbuser, authLoading, authErr] = useAuthState(auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [github, setGithub] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (fbuser) {
        await getUser(fbuser, fbuser.uid).then((user) => {
          if (user) {
            router.push('/dev/home');
          } else {
            setLoading(false);
          }
        });
      }
    };
    fetchUser();
  }, [fbuser, router]);

  if (authLoading || loading) {
    return <Loading />;
  } else if (authErr || !fbuser) {
    router.push('/');
    return <Loading />;
  }

  const handleFinish = async () => {
    setLoading(true);
    await createProfile(fbuser, {
      firstName,
      lastName,
      email: fbuser.email ?? '',
      github,
      linkedin,
      skills,
    })
      .then((val) => {
        if (val) {
          router.push('/dev/home');
        } else {
          console.log('there was an error creating profile');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(steps.length - 1, prevStep + 1));
  };
  const handleBackStep = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const steps = [
    <InfoStep
      onNext={handleNextStep}
      key={'info-step'}
      setFirstName={setFirstName}
      setLastName={setLastName}
    />,
    <SkillsStep
      onNext={handleNextStep}
      onBack={handleBackStep}
      retSkills={setSkills}
      key={'skills-step'}
    />,
    <ConnectServices
      onNext={handleNextStep}
      onBack={handleBackStep}
      setLinkedinPar={setLinkedin}
      setGithubPar={setGithub}
      key={'service-step'}
    />,
    <VerifyStep
      onBack={handleBackStep}
      onFinish={handleFinish}
      key={'verify-step'}
    />,
  ];

  return (
    <FBUserProvider>
      <main className="relative w-screen h-screen">
        <HomeBar className="backdrop-blur-[40px]" />
        <div className="relative z-10 flex flex-col items-center h-screen overflow-scroll pt-16 w-full">
          <ProgressBar
            key={'bar'}
            currentStep={currentStep + 1}
            totalSteps={steps.length}
          />
          {steps.map((screen, index) => (
            <div
              key={index}
              className={`w-full ${
                currentStep === index
                  ? 'animated animatedFadeInUp fadeInUp'
                  : 'hidden'
              }`}>
              {screen}
            </div>
          ))}
        </div>
        <div className="absolute top-0 w-screen h-screen bg-[#0f0f0f]"></div>
      </main>
    </FBUserProvider>
  );
}
