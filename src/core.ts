import type { RegisterHikeRequest, RegisterHikeResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function registerHike(
  payload: RegisterHikeRequest
): Promise<RegisterHikeResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'Не удалось отправить заявку. Проверьте соединение с сервером.'
    );
  }

  if (!response.ok) {
    let errorMessage = `Ошибка сервера: ${response.status}`;
    try {
      const errorData = await response.json();
      if (response.status === 422 && Array.isArray(errorData.detail)) {
        const details = errorData.detail
          .map((item: { msg?: string }) => item.msg || 'Некорректное значение')
          .join(', ');
        errorMessage = `Ошибка валидации: ${details}`;
      } else if (typeof errorData.detail === 'string') {
        errorMessage = errorData.detail;
      }
    } catch {
      // Игнорируем ошибку парсинга JSON, если ответ не в формате JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
