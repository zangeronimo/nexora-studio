export interface UseCase<TRequest, TResponse = void> {
  execute(input: TRequest): Promise<TResponse>;
}
