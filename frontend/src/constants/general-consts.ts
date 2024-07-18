export const Config = {
  backendUrl: 'http://localhost:3000/'
};

export class HttpResponse{
  success: boolean = true;
  msg: string | null = null;
}

export class HttpLoginResponse extends HttpResponse{
  role: string = "";
}