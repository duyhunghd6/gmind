- Rules to put to git: Do not push to git without the agreement of me or PMO.
- Project techstack: Go
- br = bd = beads_rust (instead of beads CLI), use FrankenSQLite as storage (instead of SQLite).
- Keep code file smaller than 400 lines, split into multiple files if necessary. Keep docs files smaller than 1000 lines.
- Markdown Rules (\*.md): Nếu bạn đang write new/modify/remove các file tài liệu ---> Hãy tiến hành đọc lệnh và triển khai command: @/Users/steve/duyhunghd6/gmind/.agents/workflows/arch-review-docs-add-beads.md
- Git Commit Rules: Trước khi commit, cần gom nhóm và tách các commit thành những cụm logic (1-3 sự thay đổi đáng kể cho 1 Beads ID: tác động 1 issue, 1 feature, 1 plan hoặc 1 bug). Commit message **bắt buộc** phải có đoạn Git Trailer xác định Universal ID ở dòng cuối. Định dạng chuẩn:

  ```
  loại(phạm_vi): mô tả ngắn gọn thay đổi

  Mô tả chi tiết những gì đã làm, nguyên nhân và tác động.

  Beads-ID: br-xxx, bd-xxx, br-ds-xxx
  ```

- Running website showcase at port http://localhost:9993/ ; If you can't connect just run `npm run dev` at folder `apps/website`.
