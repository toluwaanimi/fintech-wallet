import { Controller } from '@nestjs/common';
import { EventsService } from './events.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MailerIntegration } from '../common/integrations/mailer.integration';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @EventPattern('send_email_transfer_out')
  async sendTransferOut(@Payload() payload, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await MailerIntegration.sendMailUsingMailer({
        to: payload.sender_email,
        text: `You have sent ₦${payload.amount} to ${payload.receiver_name} 💸`,
        subject: 'Transfer successful 💸',
      });
      channel.ack(originalMsg);
      return;
    } catch (error) {
      channel.nack(originalMsg);
    }
  }

  @EventPattern('send_email_transfer_in')
  async sendTransferReceived(@Payload() payload, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await MailerIntegration.sendMailUsingMailer({
        to: payload.to_email,
        text: `You have received ₦${payload.amount} to ${payload.sender_name}`,
        subject: 'Deposit received',
      });
      channel.ack(originalMsg);
      return;
    } catch (error) {
      channel.nack(originalMsg);
    }
  }
}
