export const Login = () => {
  const address =
    "https://auth.cloudpractitioners.com/login?client_id=31islttts6kiol55v8lhm2q1uo&response_type=code&scope=email+openid&redirect_uri=https%3A%2F%2Fcloudpractitioners.com%2Foauth2%2Fcallback";

  // opens Cognito's HostedUI in the current window and redirects to "/" upon logging in
  window.open(address, "_self");

  return <></>;
};
//
