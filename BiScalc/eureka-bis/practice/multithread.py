import threading

# 데이터가 들어있는 리스트
data_list = [4, 2, 7, 1, 9, 5, 8]

# 최대값을 계산하는 함수
def find_max(data):
    max_val = float('-inf')
    for val in data:
        if val > max_val:
            max_val = val
    return max_val

# 멀티스레드로 최대값을 계산하고 출력하는 함수
def find_max_concurrently(data_list):
    # 각각의 스레드에서 처리할 데이터의 개수
    chunk_size = len(data_list) // 4

    # 각각의 스레드에 전달할 데이터 리스트
    data_chunks = [data_list[i:i + chunk_size] for i in range(0, len(data_list), chunk_size)]

    # 스레드 객체 리스트
    thread_list = []

    # 각각의 스레드에서 최대값 계산 후 출력
    for chunk in data_chunks:
        t = threading.Thread(target=lambda: print(find_max(chunk)))
        t.start()
        thread_list.append(t)

    # 모든 스레드가 실행될 때까지 대기
    for t in thread_list:
        t.join()

if __name__ == '__main__':
    find_max_concurrently(data_list)
