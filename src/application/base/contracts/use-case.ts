export interface UseCase<TRequest = void, TResponse = void> {
  execute(input: TRequest): Promise<TResponse>;
}
