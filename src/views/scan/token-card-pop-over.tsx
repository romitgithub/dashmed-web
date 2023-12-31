
import { Button } from '@/atoms/button';
import { CrossIcon } from '@/atoms/cross-icon';
import React from 'react';

interface ModalProps {
     onOpenModal: boolean;
     setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TokenModal: React.FC<ModalProps> = ({ onOpenModal, setShowModal }) => {

     const closeModal = () => setShowModal(false);

     return (
          <>
               {onOpenModal ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                         <div className="fixed inset-0 bg-black opacity-50"></div>
                         <div className="relative z-50 w-11/12 small:w-7/12 sm:w-7/12 md:w-10/12  md:max-w-md mx-auto my-12 border border-gray-300 shadow-lg rounded-xl bg-white py-5">
                              <div className="flex flex-wrap p-4">
                                   <p className="w-full text-center font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
                                        Token Number <span className='text-orange-400'>{56}</span>
                                   </p>
                                   <p className="w-full text-center font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
                                        <span className='text-orange-400 font-semibold'>{'29:53'}</span> minutes to expire
                                   </p>
                              </div>
                              <div className="flex justify-center p-4 rounded-b">
                                   <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-10 rounded focus:outline-none" onClick={closeModal}>OK</Button>
                              </div>
                         </div>
                    </div>
               ) : null}
          </>
     );
};

export default TokenModal;
