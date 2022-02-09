import type { AxiosError } from 'axios';
import type { Router } from 'vue-router';

export const makeHandleGetFlowError = (router: Router) => {
  const refreshFlow = () =>
    router.push({
      // for our use case, removing the flow
      // parameter from the search query and
      // reloading the page are sufficient
      // to refresh the flow
      query: {},
    });

  return (error: AxiosError) => {
    switch (error.response?.data?.error.id) {
      case 'session_already_available': // User is already signed in, let's redirect them home!
        router.push('/'); // let the router decide how to redirect them
        break;
      case 'session_aal2_required': // 2FA is enabled and enforced, but user did not perform 2fa yet!
      case 'session_refresh_required': // We need to re-authenticate to perform this action
      case 'browser_location_change_required': // Ory Kratos asked us to point the user to this URL.
        window.location.href = error.response?.data.redirect_browser_to;
        return;
      case 'self_service_flow_expired': // The flow expired, let's request a new one.
      case 'self_service_flow_return_to_forbidden': // the return is invalid, we need a new flow
      case 'security_csrf_violation': // A CSRF violation occurred. Best to just refresh the flow!
      case 'security_identity_mismatch': // The requested item was intended for someone else. Let's request a new flow...
        refreshFlow();
        return;
    }

    switch (error.response?.status) {
      case 410: // The flow expired, let's request a new one.
        refreshFlow();
        return;
    }

    // We are not able to handle the error? Return it.
    return Promise.reject(error);
  };
};
