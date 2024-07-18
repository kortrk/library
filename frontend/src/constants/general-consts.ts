export const Config = {
  backendUrl: 'http://localhost:3000/'
};

export class HttpPostResponse{
  success: boolean = true;
  msg: string | null = null;
}

export class HttpLoginPostResponse extends HttpPostResponse{
  role: string = "";
}