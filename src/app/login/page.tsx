"use client"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IUser } from '../signup/page';
import { useAppDispatch } from '@/store/store';
import { loginUser } from '@/store/reducers/authSlice';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: IUser) => {
    try {
      await dispatch(loginUser(data)); 
      Swal.fire({
        icon: 'success',
        title: 'Logged In!',
        text: 'You have successfully logged in.',
        timer: 2000,
        showConfirmButton: false
    });
    router.replace('/home/dashboard'); 
    } catch (err) {
      console.error("Login action failed:", err); 
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password. Please try again.',
        confirmButtonText: 'OK'
    });
    }
  };


  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="flex h-full flex-col lg:flex-row-reverse items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md lg:max-w-sm mx-auto my-4">
              <div className="mb-12">
                <h3 className="text-gray-800 text-4xl font-extrabold">Sign in</h3>
                <p className="text-gray-800 text-sm mt-6">Don't have an account <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
              </div>

              {/* Email Input */}
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="flex mb-4">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {/* Email Icon */}
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1l-8 4.5L2 5V4Zm16 2.32V16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6.32l8 4.5 8-4.5Z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`${touchedFields.email && errors.email
                      ? 'border-red-500'
                      : 'border-gray-300'
                    } rounded-none rounded-e-lg bg-gray-50 border text-gray-900 text-sm flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Email"
                />
              </div>
              {touchedFields.email && errors.email && (
                <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>
              )}

              {/* Password Input */}
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="flex mb-4">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {/* Password Icon */}
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a5 5 0 0 0-5 5v3H4a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3Z" />
                    <path d="M8 14a2 2 0 1 0 4 0v-2H8v2Z" />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  {...register('password')}
                  className={`${touchedFields.password && errors.password
                      ? 'border-red-500'
                      : 'border-gray-300'
                    } rounded-none rounded-e-lg bg-gray-50 border text-gray-900 text-sm flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Password"
                />
              </div>
              {touchedFields.password && errors.password && (
                <p className="text-red-500 text-xs mb-2">{errors.password.message}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Login
              </button>

              <div className="my-6 flex items-center gap-4">
                <hr className="w-full border-gray-300" />
                <p className="text-sm text-gray-800 text-center">or</p>
                <hr className="w-full border-gray-300" />
              </div>

              <button type="button" className="w-full flex items-center justify-center gap-4 py-2.5 px-4 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-transparent hover:bg-gray-50 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" className="inline" viewBox="0 0 512 512">
                  <path fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00" />
                  <path fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58" />
                  <path fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52" />
                  <path fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6" />
                  <path fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48" />
                  <path fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132" />
                </svg>
                Continue with google
              </button>
            </form>
          </div>

          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 hidden md:block">
            <Image
              src="/assets/login.gif"
              className="w-full"
              alt="Sample"
              width = {100}
              height={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
