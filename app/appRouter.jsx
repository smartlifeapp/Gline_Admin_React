import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireAuth from 'RequireAuth';
import Navigation from 'Navigation';
import Login from 'Login';
import Dashboard from 'Dashboard';
import Bundle from 'Bundle';

import loadAccommodations from 'bundle-loader?lazy!AccommodationsScreen';
import loadAccommodation from 'bundle-loader?lazy!AccommodationScreen';
import loadAdmins from 'bundle-loader?lazy!Admins';
import loadAdminMessage from 'bundle-loader?lazy!AdminMessage';
import loadAdminMessages from 'bundle-loader?lazy!AdminMessages';
import loadBannedWords from 'bundle-loader?lazy!BannedWords';
import loadCashoutRequest from 'bundle-loader?lazy!CashoutRequest';
import loadCashoutRequests from 'bundle-loader?lazy!CashoutRequests';
import loadCashLog from 'bundle-loader?lazy!CashLog';
import loadCashLogs from 'bundle-loader?lazy!CashLogs';
import loadFindballSettings from 'bundle-loader?lazy!FindballSettingsScreen';
// import loadDiscussions from 'bundle-loader?lazy!DiscussionsScreen';
import loadGroupChatroom from 'bundle-loader?lazy!GroupChatroomScreen';
import loadGroupChatrooms from 'bundle-loader?lazy!GroupChatroomsScreen';
import Modal from 'Modal';
// import loadMissions from 'bundle-loader?lazy!MissionsScreen';
import loadPointLog from 'bundle-loader?lazy!PointLog';
import loadPointLogs from 'bundle-loader?lazy!PointLogs';
import loadPhoto from 'bundle-loader?lazy!Photo';
import loadPhotos from 'bundle-loader?lazy!Photos';
import loadPhotoComment from 'bundle-loader?lazy!PhotoComment';
import loadPhotoComments from 'bundle-loader?lazy!PhotoComments';
import loadProperty from 'bundle-loader?lazy!PropertyScreen';
import loadProperties from 'bundle-loader?lazy!PropertiesScreen';
import loadPurchaseLog from 'bundle-loader?lazy!PurchaseLogScreen';
import loadPurchaseLogs from 'bundle-loader?lazy!PurchaseLogsScreen';
import loadTalk from 'bundle-loader?lazy!Talk';
import loadTalks from 'bundle-loader?lazy!Talks';
import loadUsers from 'bundle-loader?lazy!UsersScreen';
import loadUser from 'bundle-loader?lazy!UserScreen';
import loadUserUpdateLogs from 'bundle-loader?lazy!UserUpdateLogs';
import loadVideoChatLog from 'bundle-loader?lazy!VideoChatLog';
import loadVideoChatLogs from 'bundle-loader?lazy!VideoChatLogs';
import loadRestaurants from 'bundle-loader?lazy!RestaurantsScreen';
import loadRestaurant from 'bundle-loader?lazy!RestaurantScreen';

const renderBundle = comp => (
  <Bundle load={comp}>
    {LoadedUsers => <LoadedUsers />}
  </Bundle>
);
const Accommodation = () => renderBundle(loadAccommodation);
const Accommodations = () => renderBundle(loadAccommodations);
const Admins = () => renderBundle(loadAdmins);
const AdminMessage = () => renderBundle(loadAdminMessage);
const AdminMessages = () => renderBundle(loadAdminMessages);
const BannedWords = () => renderBundle(loadBannedWords);
const CashoutRequest = () => renderBundle(loadCashoutRequest);
const CashoutRequests = () => renderBundle(loadCashoutRequests);
const CashLog = () => renderBundle(loadCashLog);
const CashLogs = () => renderBundle(loadCashLogs);
const FindballSettings = () => renderBundle(loadFindballSettings);
const GroupChatrooms = () => renderBundle(loadGroupChatrooms);
const GroupChatroom = () => renderBundle(loadGroupChatroom);
// const Missions = () => renderBundle(loadMissions);
const PointLog = () => renderBundle(loadPointLog);
const PointLogs = () => renderBundle(loadPointLogs);
const Photo = () => renderBundle(loadPhoto);
const Photos = () => renderBundle(loadPhotos);
const PhotoComment = () => renderBundle(loadPhotoComment);
const PhotoComments = () => renderBundle(loadPhotoComments);
const Property = () => renderBundle(loadProperty);
const Properties = () => renderBundle(loadProperties);
const PurchaseLog = () => renderBundle(loadPurchaseLog);
const PurchaseLogs = () => renderBundle(loadPurchaseLogs);
const Restaurants = () => renderBundle(loadRestaurants);
const Restaurant = () => renderBundle(loadRestaurant);
const Talk = () => renderBundle(loadTalk);
const Talks = () => renderBundle(loadTalks);
const User = () => renderBundle(loadUser);
const Users = () => renderBundle(loadUsers);
const UserUpdateLogs = () => renderBundle(loadUserUpdateLogs);
const VideoChatLog = () => renderBundle(loadVideoChatLog);
const VideoChatLogs = () => renderBundle(loadVideoChatLogs);
const Story = () => renderBundle(Story);
// class AppRouter extends Component {
//   componentDidMount() {
//     // loadUsers(() => {});
//     // loadUser(() => {});
//   }
//   render() {
    // return (
const AppRouter = () => (
  <div>
    <Route exact path="/login" component={Login} />
    <Route path="/" component={Navigation} />
    <Route path="/" component={Modal} />
    <Switch>
      <Route exact path="/" component={RequireAuth(Dashboard)} />
      <Route path="/accommodation/:uid" component={RequireAuth(Property)} />
      <Route path="/accommodations" component={RequireAuth(Properties)} />
      <Route path="/adminMessages" component={RequireAuth(AdminMessages)} />
      <Route path="/adminMessage/:id" component={RequireAuth(AdminMessage)} />
      <Route path="/admins" component={RequireAuth(Admins)} />
      <Route path="/bannedWords" component={RequireAuth(BannedWords)} />
      <Route path="/cashoutRequest/:id" component={RequireAuth(CashoutRequest)} />
      <Route path="/cashoutRequests" component={RequireAuth(CashoutRequests)} />
      <Route path="/cashLog/:id" component={RequireAuth(CashLog)} />
      <Route path="/comment/:uid" component={RequireAuth(Property)} />
      <Route path="/comments" component={RequireAuth(Properties)} />
      <Route path="/confirmShot/:uid" component={RequireAuth(GroupChatroom)} />
      <Route path="/discussion/:uid" component={RequireAuth(GroupChatroom)} />
      <Route path="/discussions" component={RequireAuth(GroupChatrooms)} />
      <Route path="/findballSettings" component={RequireAuth(FindballSettings)} />
      <Route path="/mission/:uid" component={RequireAuth(GroupChatroom)} />
      <Route path="/missions" component={RequireAuth(GroupChatrooms)} />
      <Route path="/teamplay/:uid" component={RequireAuth(GroupChatroom)} />
      <Route path="/teamplays" component={RequireAuth(GroupChatrooms)} />
      <Route path="/photo/:id" component={RequireAuth(Photo)} />
      <Route path="/photos" component={RequireAuth(Photos)} />
      <Route path="/photoComment/:id" component={RequireAuth(PhotoComment)} />
      <Route path="/photoComments" component={RequireAuth(PhotoComments)} />
      <Route path="/pointLog/:id" component={RequireAuth(PointLog)} />
      <Route path="/pointLogs" component={RequireAuth(PointLogs)} />
      <Route path="/purchaseLog/:id" component={RequireAuth(PurchaseLog)} />
      <Route path="/purchaseLogs" component={RequireAuth(PurchaseLogs)} />
      <Route path="/report/:id" component={RequireAuth(Property)} />
      <Route path="/reports" component={RequireAuth(Properties)} />
      <Route path="/restaurant/:uid" component={RequireAuth(Property)} />
      <Route path="/restaurants" component={RequireAuth(Properties)} />
      <Route path="/review/:uid" component={RequireAuth(Property)} />
      <Route path="/reviews" component={RequireAuth(Properties)} />
      <Route path="/talk/:id" component={RequireAuth(Talk)} />
      <Route path="/talks" component={RequireAuth(Talks)} />
      <Route path="/users" component={RequireAuth(Users)} />
      <Route path="/user/:id" component={RequireAuth(User)} />
      <Route path="/userUpdateLogs" component={RequireAuth(UserUpdateLogs)} />
      <Route path="/videoChatLog/:id" component={RequireAuth(VideoChatLog)} />
      <Route path="/videoChatLogs" component={RequireAuth(VideoChatLogs)} />
      <Route path="/storys" component={RequireAuth(Story)} />
    </Switch>
  </div>
);

//     );
//   }
// }


export default AppRouter;
