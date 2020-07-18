export default class EnvironmentService {
  static isServerSide = (): boolean => !process.browser;
}
