
import React from 'react';
import RolePage from './RolePage';
import OwnersSection from '@/components/sections/OwnersSection';
import AuditSection from '@/components/sections/AuditSection';

const OwnersPage = () => (
  <RolePage roleSection={
    <>
      <OwnersSection />
      <AuditSection />
    </>
  } />
);

export default OwnersPage;
