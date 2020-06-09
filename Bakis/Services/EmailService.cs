using Bakis.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Bakis.Services
{
    public class EmailService : IEmailService
    {
        private readonly AuthMessageSenderOptions _smtpSettings;
        public EmailService(IOptions<AuthMessageSenderOptions> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Execute(_smtpSettings.Password, subject, message, email);
        }
        public async Task Execute(string apiKey, string subject, string message, string email)
        {
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(new MailboxAddress("MeetKaunasOfficial", "aMeetKaunas@gmail.com"));
            mimeMessage.To.Add(new MailboxAddress("", email));
            mimeMessage.Subject = subject;
            mimeMessage.Body = new TextPart("html")
            {
                Text = message
            };
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.Connect(_smtpSettings.Server, _smtpSettings.Port, true);
                // Note: only needed if the SMTP server requires authentication
                client.Authenticate(_smtpSettings.Username, _smtpSettings.Password);

                await client.SendAsync(mimeMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}
