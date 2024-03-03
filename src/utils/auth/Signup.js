import { gql } from "@apollo/client";
import Client from "../../components/Client";
import authUser from "./User";

const SIGNUP = gql`
mutation Register($input:UsersPermissionsRegisterInput!){
  register(input:$input){
   user{
     id
     username
   }
   jwt
 } 
 }
`;

const authSignup = async (credentials, onSignupError) => {
  const { email, password, username } = credentials;
  try {
    const { data } = await Client.mutate({
      mutation: SIGNUP,
      variables: {
        input: {
          email,
          password,
          username
        },
      },
    });
    localStorage.setItem("token", data.register.jwt);
    localStorage.setItem("id", data.register.user.id);
    const user = await authUser(data.register.user.id);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      ratings: user.ratings.data.map(({ attributes }) => {
        return {
          place_id: attributes.place_id,
        };
      }),
    };
  } catch (error) {
    onSignupError("This email or username is already in use");
    console.log(error);
  }
};

export default authSignup;
