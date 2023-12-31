import React, { createContext, useState, ReactNode } from 'react';

export const APPLICATION_STATUS = {
     DEFAULT_TYPE_FOR_SCAN: 'DEFAULT_TYPE_FOR_SCAN',
     APPLICATION_AVAILABLE: 'APPLICATION_AVAILABLE',
     APPLICATION_NOT_AVAILABLE: 'APPLICATION_NOT_AVAILABLE',
};

interface ScanDataProviderProps {
     children: ReactNode;
};

export const ScanDataContext = createContext<any>(null);

export const ScanDataProvider = ({ children }: ScanDataProviderProps) => {

     const [applicationStatus, setApplicationStatus] = useState<string>(APPLICATION_STATUS.DEFAULT_TYPE_FOR_SCAN);
     const handleChangeApplicationStatus = (value: string) => setApplicationStatus(value);

     return (
          <ScanDataContext.Provider
               value={{
                    applicationStatus,
                    setApplicationStatus,
               }}
          >
               {children}
          </ScanDataContext.Provider>
     );
};
