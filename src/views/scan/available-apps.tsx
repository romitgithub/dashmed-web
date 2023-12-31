
import { Button } from '@/atoms/button';
import { CrossIcon } from '@/atoms/cross-icon';
import React, { useEffect, useState } from 'react';

interface ModalProps {
     onOpenModal: boolean;
     setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const APP_STATUS = {
     APPLICATION_INSTALLED: "APPLICATION_INSTALLED",
     APPLICATION_NOT_INSTALLED: "APPLICATION_NOT_INSTALLED",
};

const AvailableAppsModal: React.FC<ModalProps> = ({ onOpenModal, setShowModal }) => {

     const closeModal = () => setShowModal(false);
     const [appStatus, setAppStatus] = useState(APP_STATUS.APPLICATION_INSTALLED);
     const [isChromeInstalled, setIsChromeInstalled] = useState(false);
     const [isWhatsAppInstalled, setIsWhatsAppInstalled] = useState(false);

     useEffect(() => {
          // Check for Chrome installation by attempting to open a Chrome-specific URL scheme
          const checkChromeInstallation = () => {
               const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
               setIsChromeInstalled(isChrome);
          };

          // Check for WhatsApp installation by attempting to open a WhatsApp-specific URL scheme
          const checkWhatsAppInstallation = () => {
               const timeout = 1500; // Set a timeout to check if the app responds
               const whatsappURL = 'whatsapp://send?text=test'; // URL scheme for WhatsApp
               const timer = setTimeout(() => setIsWhatsAppInstalled(false), timeout);
               const iframe = document.createElement('iframe');
               iframe.style.display = 'none';
               iframe.src = whatsappURL;
               document.body.appendChild(iframe);
               iframe.onload = () => {
                    clearTimeout(timer);
                    setIsWhatsAppInstalled(true);
                    document.body.removeChild(iframe);
               };
          };
          checkChromeInstallation();
          checkWhatsAppInstallation();
     }, []);

     const openChrome = () => window.location.href = 'https://www.google.com/chrome/';
     const openWhatsApp = () => window.location.href = 'https://www.whatsapp.com/download/';

     return (
          <>
               {onOpenModal ? (
                    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                         <div className="fixed inset-0 bg-black opacity-50"></div>
                         <div className="relative z-50 w-11/12 md:max-w-md mx-auto my-12 border border-gray-300 shadow-lg rounded-md bg-white">
                              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t">
                                   <h3 className="text-lg font-semibold">Open with</h3>
                                   {/* <Button className="focus:outline-none" onClick={closeModal}>{<CrossIcon />}</Button> */}
                              </div>
                              <div className="flex flex-wrap p-4">
                                   {appStatus === APP_STATUS.APPLICATION_INSTALLED ? (
                                        <>
                                             {isChromeInstalled && <Button className='m-2' onClick={openChrome}><img src='https://www.google.com/chrome/static/images/chrome-logo.svg'/></Button>}
                                             {isChromeInstalled && <Button className='m-2' onClick={openChrome}><img src='https://www.google.com/chrome/static/images/chrome-logo.svg'/></Button>}
                                             {isChromeInstalled && <Button className='m-2' onClick={openChrome}><img src='https://www.google.com/chrome/static/images/chrome-logo.svg'/></Button>}
                                             {isChromeInstalled && <Button className='m-2' onClick={openChrome}><img src='https://www.google.com/chrome/static/images/chrome-logo.svg'/></Button>}
                                             {isChromeInstalled && <Button className='m-2' onClick={openChrome}><img src='https://www.google.com/chrome/static/images/chrome-logo.svg'/></Button>}
                                             {isChromeInstalled && <Button className='m-2' onClick={openChrome}><img src='https://www.google.com/chrome/static/images/chrome-logo.svg'/></Button>}
                                             {isChromeInstalled && <Button className='m-2' onClick={openChrome}><img src='https://www.google.com/chrome/static/images/chrome-logo.svg'/></Button>}
                                             {isChromeInstalled && <Button className='m-2' onClick={openChrome}><img src='https://www.google.com/chrome/static/images/chrome-logo.svg'/></Button>}
                                             {isChromeInstalled && <Button className='m-2' onClick={openChrome}><img src='https://www.google.com/chrome/static/images/chrome-logo.svg'/></Button>}
                                             {isChromeInstalled && <Button className='m-2' onClick={openChrome}><img src='https://www.google.com/chrome/static/images/chrome-logo.svg'/></Button>}
                                             {isWhatsAppInstalled && <Button className='m-2' onClick={openWhatsApp}>Open WhatsApp</Button>}
                                        </>
                                   ) : (
                                        <> Apps not available </>
                                   )}
                              </div>
                              {/* <div className="flex justify-end p-4 rounded-b">
                                   <Button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
                                        onClick={closeModal}>
                                        Close
                                   </Button>
                              </div> */}
                         </div>
                    </div>
               ) : null}
          </>
     );
};

export default AvailableAppsModal;
