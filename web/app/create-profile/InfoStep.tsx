import Image from 'next/image';
import { User, updateEmail, updateProfile } from 'firebase/auth';
import { StepProps } from './page';
import Stepper from '@components/common/Stepper';
import TextField from '@components/common/TextField';
import { useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fstorage } from '@/firebase/clientApp';
import { useFBUser } from '@context/FBUserContext';

export default function InfoStep({
  onNext,
  onBack,
  setFirstName,
  setLastName,
}: StepProps & {
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
}) {
  const { fbuser } = useFBUser();

  let displayName = fbuser.displayName ?? '';
  const nameArray = displayName.split(' ');
  let firstName = '';
  let lastName = '';
  if (nameArray.length === 1) {
    firstName = nameArray[0];
  } else if (nameArray.length >= 2) {
    firstName = nameArray.shift() ?? '';
    lastName = nameArray.join(' ') ?? '';
  }

  const [fname, setFName] = useState(firstName);
  const [fnameError, setFnameError] = useState('');
  const [lname, setLName] = useState(lastName);
  const [lnameError, setLnameError] = useState('');

  const [imageURL, setImageURL] = useState(fbuser.photoURL);
  const [newImageData, setNewImageData] = useState<File>();

  const updateFname = (val: string) => {
    setFName(val);
    setFnameError('');
  };
  const updateLname = (val: string) => {
    setLName(val);
    setLnameError('');
  };

  const submit = async () => {
    var allgood = true;
    if (!fname) {
      setFnameError('Required');
      allgood = false;
    }
    if (!lname) {
      setLnameError('Required');
      allgood = false;
    }

    if (!allgood) return;
    setFirstName(fname);
    setLastName(lname);

    onNext && onNext();

    await updateProfile(fbuser, {
      displayName: fname + ' ' + lname,
      photoURL: newImageData
        ? await uploadImage(newImageData, fbuser)
        : await uploadImage(
            await urlToFile(
              imageURL ??
                'https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png',
              fbuser.uid,
              'image/png'
            ),
            fbuser
          ),
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold text-gray-300">Introduce Yourself</h1>
      <h1 className="text-md w-[40%] text-gray-500 text-center mt-3">
        Tell us who you are and add a profile picture to personalize your
        profile
      </h1>

      <div className="mt-4 flex flex-row items-center">
        <ImageUpload
          setNewImageData={setNewImageData}
          url={
            fbuser.photoURL ??
            'https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png'
          }
        />

        <div className="flex flex-col w-64">
          <TextField
            label="Name"
            setValue={updateFname}
            name="fname"
            type="fname"
            autoComplete="fname"
            errorMsg={fnameError}
            className="mt-3 bg-gray-800 text-gray-300"
            defaultValue={fname}
          />
          <TextField
            label="Last Name"
            setValue={updateLname}
            name="lname"
            type="lname"
            autoComplete="lname"
            errorMsg={lnameError}
            className="mt-3 bg-gray-800 text-gray-300"
            defaultValue={lname}
          />
        </div>
      </div>
      <Stepper onNext={submit} onBack={onBack} />
    </div>
  );
}

const ImageUpload = ({
  url,
  setNewImageData,
}: {
  url: string;
  setNewImageData: (file: File) => void;
}) => {
  const [image, setImage] = useState<string>(url);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onImageClick = () => {
    inputFile.current?.click();
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 1 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setNewImageData(file);
    } else {
      alert('Please choose an image that is less than 1MB.');
    }
  };
  return (
    <div>
      <div
        className="relative w-52 aspect-square rounded-full mr-6 border-2 cursor-pointer hover:border-4 hover:border-gray-100 overflow-hidden"
        onClick={onImageClick}>
        <Image
          width={0}
          height={0}
          className="object-fill w-52 aspect-square rounded-full"
          src={image}
          alt="test"
        />
        <div className="absolute bottom-0 mx-0 left-0 right-0 flex flex-row items-center justify-center bg-black/[50%] p-2 backdrop-blur-lg text-sm">
          Edit Image
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
    </div>
  );
};

async function uploadImage(file: File, fbuser: User) {
  const fileRef = ref(fstorage, fbuser.uid + '.png');
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}

async function urlToFile(url: string, filename: string, mimeType: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}
