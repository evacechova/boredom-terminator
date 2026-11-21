import { z } from "zod";
import type { MapEvent } from "./types";

export const eventTitleSchema = z
  .string()
  .refine((value) => value.trim().length >= 1 && value.trim().length <= 100, {
    message: "Title must have 1–100 characters after trimming.",
  });
export const eventVenueNameSchema = z.string().refine((value) => value.trim().length <= 120, {
  message: "Venue name must have at most 120 characters after trimming.",
});
export const eventDescriptionSchema = z.string().max(500);
export const eventSourceUrlSchema = z.url({ protocol: /^https?$/ }).max(2048);

const utcIsoDateTimeSchema = z.iso.datetime().refine((value) => Number.isFinite(Date.parse(value)));

export const storedEventSchema = z
  .object({
    id: z.string().refine((value) => value.trim().length > 0, { message: "ID is required." }),
    title: eventTitleSchema,
    category: z.enum([
      "random_play_dance",
      "cover_shoot",
      "dance_class",
      "festival",
      "party",
      "fan_event",
      "concert",
      "store_event",
    ]),
    startsAt: utcIsoDateTimeSchema,
    endsAt: utcIsoDateTimeSchema.optional(),
    createdAt: utcIsoDateTimeSchema,
    location: z.object({
      city: z.literal("Praha"),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    }),
    venueName: eventVenueNameSchema.optional(),
    description: eventDescriptionSchema.optional(),
    sourceUrl: eventSourceUrlSchema.optional(),
  })
  .refine(
    (event) => event.endsAt === undefined || Date.parse(event.endsAt) > Date.parse(event.startsAt),
    { message: "End must be later than start.", path: ["endsAt"] },
  ) satisfies z.ZodType<MapEvent>;
