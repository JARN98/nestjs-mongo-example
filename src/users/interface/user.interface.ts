import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: String;
  readonly pass: String;
  readonly roles: String[];
}
