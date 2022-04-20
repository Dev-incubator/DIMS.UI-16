export function getStatusColor(status) {
  switch (status) {
    case 'Success': {
      return 'success';
    }
    case 'Active': {
      return 'primary';
    }
    case 'Fail': {
      return 'error';
    }
    default: {
      return 'error';
    }
  }
}
