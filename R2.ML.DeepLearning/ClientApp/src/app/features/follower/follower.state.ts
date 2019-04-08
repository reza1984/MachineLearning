import * as fromRoot from '../../state/app.interface';
import { FollowerState } from './states/follower.interface';

export interface State extends fromRoot.State {
  follower: FollowerState;
}
