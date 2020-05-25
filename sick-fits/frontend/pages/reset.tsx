import React from 'react';
import { useRouter } from 'next/router';
import { ResetPassword } from 'src/components/reset_password/ResetPassword';

const Reset: React.FC = () => {
  const router = useRouter();
  const resetToken = router.query.resetToken;
  if (!resetToken) {
    return <p>Reset token is not provided.</p>;
  }
  if (Array.isArray(resetToken)) {
    return <p>Please only provide one reset token.</p>;
  }
  return <ResetPassword resetToken={resetToken}></ResetPassword>;
};

export default Reset;
