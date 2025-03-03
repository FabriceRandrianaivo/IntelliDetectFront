import { useState } from 'react';

const useDrawer = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  return { showDrawer, handleOpenDrawer, handleCloseDrawer };
};

export default useDrawer;