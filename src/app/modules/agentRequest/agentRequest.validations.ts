import z from "zod";
import { AgentRequestStatus } from "./agentRequest.interfaces";


// Agent reuqest payload zod schema
export const agentRequestPayloadZodSchema = z.object({
    status: z.nativeEnum(AgentRequestStatus)
})
