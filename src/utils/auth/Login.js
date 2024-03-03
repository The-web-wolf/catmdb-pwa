import { gql } from "@apollo/client";
import Client from "../../components/Client";
import authUser from "./User";

const LOGIN = gql`
  mutation login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
      }
    }
  }
`;

const authLogin = async (credentials, onLoginError) => {
  const { email, password } = credentials;
  try {
    const { data } = await Client.mutate({
      mutation: LOGIN,
      variables: {
        input: {
          identifier: email,
          password,
          provider: "local",
        },
      },
    });
    localStorage.setItem("token", data.login.jwt);
    localStorage.setItem("id", data.login.user.id);
    const user = await authUser(data.login.user.id);
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
    onLoginError("Invalid email or password");
    console.log(error);
  }
};

export default authLogin;
