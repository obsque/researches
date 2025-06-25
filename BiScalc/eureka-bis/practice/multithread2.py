import random
import threading
from queue import Queue

def find_max(q):
    max_val = 0
    while True:
        val = q.get()
        if val == "STOP":
            break
        if val > max_val:
            max_val = val
    return max_val

def multi_threaded_max(nums, num_threads):
    q = Queue()
    for num in nums:
        q.put(num)

    threads = []
    for i in range(num_threads):
        t = threading.Thread(target=find_max, args=(q,))
        threads.append(t)
        t.start()

    for i in range(num_threads):
        q.put("STOP")

    max_vals = []
    for t in threads:
        t.join()
        max_vals.append(q.get())

    return max(max_vals)

nums = [random.randint(0, 100) for i in range(100000)]
max_val = multi_threaded_max(nums, 4)
print(f"The maximum value is: {max_val}")
