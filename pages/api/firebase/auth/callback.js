export default function handler(req, res) {
  const { mode, oobCode, apiKey, lang } = req.query;
  if ([
    'resetPassword',
    'recoverEmail',
    'verifyEmail'
  ].includes(mode) && oobCode && apiKey && lang) {
    switch (mode) {
      case 'resetPassword':
        res.redirect(`/auth/reset-password?mode=verifyEmail&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`)
        break;
      case 'verifyEmail':
        res.redirect(`/auth/verify-email?mode=verifyEmail&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`)
    }
  } else {
    res.redirect('/')
  }
  // res.status(200).json({ name: 'John Doe' })
}