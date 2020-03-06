function sendEmail(email, description) {
  const msg = {
    to: `${email}`,
    from: 'marcell.maruli021@gmail.com',
    subject: `MixList Announcement!`,
    text: `${description}`,
    html: `<strong>${description}</strong>`,
  };
  return msg
}

module.exports = sendEmail
