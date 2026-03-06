export interface RemoveBookUseCase {
  execute(id: string): Promise<void>;
}
