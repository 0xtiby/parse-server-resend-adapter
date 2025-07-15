/* eslint-disable no-unused-vars */

/**
 * Mail Adapter prototype
 * A MailAdapter should implement at least sendMail()
 */
class MailAdapter {
  /*
   * A method for sending mail
   * @param options would have the parameters
   * - to: the recipient
   * - text: the raw text of the message
   * - subject: the subject of the email
   */
  sendMail(options: any) {}
  sendVerificationEmail({
    link,
    appName,
    user,
  }: {
    link: string;
    appName: string;
    user: any;
  }) {}
  sendPasswordResetEmail({
    link,
    appName,
    user,
  }: {
    link: string;
    appName: string;
    user: any;
  }) {}
}

export default MailAdapter;
