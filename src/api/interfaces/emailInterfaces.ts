import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from 'nodemailer'

interface IEmailProvider{
    emailTransport:nodemailer.Transport<SMTPTransport.SentMessageInfo>
    emailAddress:string
}
export {IEmailProvider}