import './UserListItem.css';
// NOTE: mock から生成したスキーマを取得
import { components } from '../../_schema';

type Props = components['schemas']['user']

function UserListItem({ id, name, age }: Props) {
  return (
    <dl className="UserListItem">
      <div className="UserListItem-item">
        <dt className="UserListItem-item-term">ID:</dt>
        <dd className="UserListItem-item-desc">{ id }</dd>
      </div>
      <div className="UserListItem-item">
        <dt className="UserListItem-item-term">Name:</dt>
        <dd className="UserListItem-item-desc">{ name }</dd>
      </div>
      <div className="UserListItem-item">
        <dt className="UserListItem-item-term">Age:</dt>
        <dd className="UserListItem-item-desc">{ age }</dd>
      </div>
    </dl>
  );
}

export default UserListItem;
