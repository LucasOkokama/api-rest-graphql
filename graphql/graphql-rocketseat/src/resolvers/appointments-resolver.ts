import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { createAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { Appointment } from "../dtos/models/appointment-model";

@Resolver()
export class AppointmentsResolver {
  @Query(() => String)
  async helloWorld() {
    return 'Hello World'
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Arg("data") data: createAppointmentInput
  ) {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt
    }

    return appointment
  }
}