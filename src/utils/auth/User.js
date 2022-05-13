import { gql } from "@apollo/client";
import Client from "../../components/Client";

const GETUSER = gql`
query usersPermissionsUser($id:ID!){
  usersPermissionsUser(id:$id){
    data{
      id
      attributes{
        username
        firstName
        lastName
        Location
        email
        ratings{
          data{
            attributes{
            	place_id
            }
          }
        }
      }
    }
  }
}
`;

const UPDATE_USER = gql`
mutation updateUsersPermissionsUser($id:ID!, $data: UsersPermissionsUserInput!){
  updateUsersPermissionsUser(id:$id,data:$data){
    data{
      id
      attributes{
        username
        firstName
        lastName
        Location
        email
        ratings{
          data{
            attributes{
              place_id
            }
          }
        }
      }
    }
  }
}
`;

const authUser = async (id) => {
  try {
    const { data } = await Client.query({
      query: GETUSER,
      variables: {
        id: id,
      },
    });
    return {
      id: data.usersPermissionsUser.data.id,
      firstName: data.usersPermissionsUser.data.attributes.firstName || "No",
      lastName: data.usersPermissionsUser.data.attributes.lastName || "Name",
      username: data.usersPermissionsUser.data.attributes.username,
      ratings: data.usersPermissionsUser.data.attributes.ratings,
      email: data.usersPermissionsUser.data.attributes.email,
      location: data.usersPermissionsUser.data.attributes.Location || '-',
    };
  }
  catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({id, username, firstName, lastName, location}) => {
  try {
    const { data: { updateUsersPermissionsUser } } = await Client.mutate({
      mutation: UPDATE_USER,
      variables: {
        id: id,
        data: {
          username: username,
          firstName: firstName,
          lastName: lastName,
          Location: location,
        }
      },
    });
    return{
      id: updateUsersPermissionsUser.data.id,
      firstName: updateUsersPermissionsUser.data.attributes.firstName || "No",
      lastName: updateUsersPermissionsUser.data.attributes.lastName || "Name",
      username: updateUsersPermissionsUser.data.attributes.username,
      ratings: updateUsersPermissionsUser.data.attributes.ratings,
      email: updateUsersPermissionsUser.data.attributes.email,
      location: updateUsersPermissionsUser.data.attributes.Location || '-',
    };
  } catch (error) {
    console.log(error);
  }
};

export default authUser;