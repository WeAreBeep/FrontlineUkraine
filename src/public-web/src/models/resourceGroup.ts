import { ResourceType } from './resourceType';
import { MessageID } from '../locale/type';

interface BaseResourceGroup {
  id: number;
  name: MessageID;
  description?: MessageID;
}

interface LeafResourceGroup extends BaseResourceGroup {
  type: 'leaf';
  resourceTypes: ResourceType[];
}

interface NodeResourceGroup extends BaseResourceGroup {
  type: 'node';
  subGroups: ResourceGroup[];
}

export type ResourceGroup = LeafResourceGroup | NodeResourceGroup;
